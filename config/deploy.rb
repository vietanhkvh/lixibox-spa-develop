lock "~> 3.11.1"

set :application, "lixibox-spa"
set :repo_url, 'https://github.com/lixibox/lixibox-spa'
set :keep_releases, 5
current_branch = ENV["CIRCLE_BRANCH"] || `git rev-parse --abbrev-ref HEAD`.chomp
set :branch, ENV["branch"] || current_branch || 'master'

set :dir_to_copy, 'build'
set :app_sync_files, %w(index.html robots.txt version.json apple-app-site-association)

set :sentry_org, 'lixibox'
set :sentry_project, 'ecom-frontend'
set :sentry_release_auth_token, 'bb16c6e5b4c3403793689449f709cc68c1a2260f5d794af5ade0bf99e263f116'

set :username, ENV['CIRCLE_USERNAME'] || `git config user.name`.chomp

namespace :deploy do
  after :finishing, 'notify:sentry'
  after :finishing, 'upload:source_maps'
  after :finishing, 'notify:slack'
end
