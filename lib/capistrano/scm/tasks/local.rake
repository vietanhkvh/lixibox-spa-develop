namespace :local do
  task :create_release do
    on release_roles :all do
      execute :mkdir, "-p", release_path
    end

    if Rake::Task.task_defined?('deploy:upload')
      invoke('deploy:upload')
    else
      raise "Expecting a deploy:upload task to be defined."
    end
  end

  task :set_current_revision do
    on :local do
      revision = ENV['CIRCLE_SHA1']

      unless ENV['CIRCLECI']
        revision = capture :git, 'log', '--format="%H"', '-n', '1'
      end

      set :current_revision, revision
    end
  end
end
