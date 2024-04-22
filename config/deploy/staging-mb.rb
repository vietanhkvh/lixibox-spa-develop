set :stage, :staging_mb

set :user, 'deploy'
set :s3_bucket, 'lixibox-staging-uploads'
set :s3_assets_dir, 'frontend/assets/staging-mb'
set :live_assets_path_prefix, 'frontend/assets/staging-mb'
set :deploy_to, "/home/deploy/frontend"

server 'lxb-mb.click', user: fetch(:user), roles: %w{app}
