set :stage, :pre_production

set :user, 'deploy'
set :s3_bucket, 'lixibox-staging-uploads'
set :s3_assets_dir, 'frontend/assets/staging'
set :live_assets_path_prefix, 'frontend/assets/staging'
set :deploy_to, "/home/deploy/lixibox-spa"

server 'lxb-rc.click', user: fetch(:user), roles: %w{app}
