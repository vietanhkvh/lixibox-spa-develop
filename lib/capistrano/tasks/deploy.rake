# frozen_string_literal: true

require 'json'

namespace :deploy do
  namespace :upload do
    desc 'Upload to EC2'
    task :app do
      if fetch(:stage) == :production && release_path == current_path
        raise "Invalid release_path #{release_path} for #{fetch(:stage)} environment"
      end

      unless File.exist?("#{fetch(:dir_to_copy)}/index.html")
        raise "Expecting index.html to exist!"
      end

      on :local do
        execute(:mkdir, '-p', '$HOME/.ssh/') if ENV['CIRCLECI']

        release_roles(:all).each do |host|
          if ENV['CIRCLECI']
            execute :'ssh-keyscan', "-H #{host.hostname} >> $HOME/.ssh/known_hosts"
          end

          # rsync --recursive --archive --acls --xattrs --compress \
          #       --include=assets/js/wk.js \
          #       --exclude=*/*.map --exclude=*/*.js --exclude=assets/css/* \
          #       dist/
          #       USER@HOST:RELEASE_PATH
          execute :rsync,
            '--recursive --archive --acls --xattrs --compress --rsh="ssh -T -o Compression=no -x"',
            "--exclude-from='config/deploy/.app_excludes'",
            "#{fetch(:dir_to_copy)}/",
            "#{host.user}@#{host.hostname}:#{release_path}"
        end
      end
    end

    desc 'Upload assets to S3'
    task :assets do
      content_types = {
        '.js' => 'application/javascript',
        '.css' => 'text/css',
        '.svg' => 'image/svg+xml',
        '.png' => 'image/png',
        '.html' => 'text/html',
        '.json' => 'application/json',
      }

      on :local do
        files = Dir['build/static/{css,js}/*.{css,js}']

        raise "Cannot find any assets files." if files.empty?

        info "Preparing to upload #{files.size} files to bucket #{fetch(:s3_bucket)}."
        require 'aws-sdk-s3'
        s3_bucket = Aws::S3::Resource.new(region:'ap-southeast-1').bucket(fetch(:s3_bucket))

        thread_count = 10
        threads = []
        expiration_time = Time.now + 30 * 3600 * 24

        thread_count.times do |i|
          threads[i] = Thread.new do
            loop do
              break if files.empty?
              file = files.pop rescue nil
              next unless file
              file_name = File.basename file
              path_name = File.dirname(file).gsub(File.join(fetch(:dir_to_copy), '/'), '')

              data = File.open(file)

              upload_path = "#{fetch(:s3_assets_dir)}/#{fetch(:current_revision)}/#{path_name}/#{file_name}"
              info "Uploading #{upload_path}"
              s3_bucket
                .object(upload_path)
                .put(
                  body: data,
                  acl: 'public-read',
                  expires: expiration_time,
                  content_type: content_types[File.extname(file_name)]
                )
            end
          end
        end
        threads.each(&:join)
      end
    end

    # TODO: Fix and upload CSS sourcemap
    desc 'Upload source maps to Sentry'
    task :source_maps do
      on :local do
        info "Uploading build artifacts to Sentry."

        dist_dir = File.expand_path(fetch(:dir_to_copy))
        asset_path_prefix = "~/#{fetch(:live_assets_path_prefix)}/#{fetch(:current_revision)}/"

        execute(
          'sentry-cli', '--auth-token', fetch(:sentry_release_auth_token),
          'releases', '--org', fetch(:sentry_org), '--project', fetch(:sentry_project),
          'files', fetch(:current_revision), 'upload-sourcemaps',
          dist_dir, '--url-prefix', "\"#{asset_path_prefix}\"",
          '--ignore', 'scripts', '--ignore', 'styles', '--ext=js', '--ext=map', '--ext=css'
        )

        info 'Source maps and minified files were uploaded to Sentry.'
      end
    end
  end

  desc 'Upload dist'
  task :upload do
    invoke('deploy:upload:assets')
    invoke('deploy:upload:app')
  end

  desc 'Notify services'
  namespace :notify do
    desc 'Notify Sentry'
    task :sentry do
      on :local do
        info 'Publishing deployment on Sentry'

        execute(
          'sentry-cli', '--auth-token', fetch(:sentry_release_auth_token),
          'releases', '--org', fetch(:sentry_org), '--project', fetch(:sentry_project),
          'new', fetch(:current_revision), '--finalize'
        )

        info 'Deployment published on Sentry.'
      end
    end

    desc 'Notify Slack'
    task :slack do
      on :local do
        info 'Publishing deployment on Slack'
        message = {
          "text": "#{fetch(:username)} deployed branch #{fetch(:branch)} of frontend to #{fetch(:stage)}"
        }

        execute(
          'curl', '--location', '--request', 'POST', 'https://hooks.slack.com/services/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',
          '--header', "'Content-Type: application/json'",
          '--data', "'#{JSON.generate(message)}'",
        )

        info 'Deployment published on Slack.'
      end
    end
  end
end
