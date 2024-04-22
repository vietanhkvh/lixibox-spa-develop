set :stage, :staging_be

set :user, 'deploy'
set :s3_bucket, 'lixibox-staging-uploads'
set :s3_assets_dir, 'frontend/assets/staging-be'
set :live_assets_path_prefix, 'frontend/assets/staging-be'
set :deploy_to, "/home/deploy/frontend"

server 'lxb-be.click', user: fetch(:user), roles: %w{app}
