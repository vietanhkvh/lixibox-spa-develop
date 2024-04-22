set :stage, :production

set :user, 'ubuntu'
set :branch, 'master'
set :s3_bucket, 'lixibox-production-uploads'
set :s3_assets_dir, 'frontend/assets'
set :live_assets_path_prefix, 'assets' # required for Sentry
set :deploy_to, "/home/ubuntu/spa"

server '13.251.79.67', user: fetch(:user), roles: %w{app}
