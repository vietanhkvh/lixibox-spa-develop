set :stage, :qa

set :user, 'deploy'
set :s3_bucket, 'lixibox-staging-uploads'
set :s3_assets_dir, 'frontend/assets/qa'
set :live_assets_path_prefix, 'frontend/assets/qa'
set :deploy_to, "/home/deploy/frontend"

server 'lxb-qa.click', user: fetch(:user), roles: %w{app}
