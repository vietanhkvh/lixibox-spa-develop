set :stage, :staging_fe

set :user, 'deploy'
set :s3_bucket, 'lixibox-staging-uploads'
set :s3_assets_dir, 'frontend/assets/staging-fe'
set :live_assets_path_prefix, 'frontend/assets/staging-fe'
set :deploy_to, "/home/deploy/frontend"

server 'lxb-fe.click', user: fetch(:user), roles: %w{app}
