# frozen_string_literal: true

require "capistrano/scm/plugin"

class Capistrano::SCM::Local < Capistrano::SCM::Plugin
  def set_defaults
  end

  def define_tasks
    eval_rakefile File.expand_path('./tasks/local.rake', __dir__)
  end

  def register_hooks
    after 'deploy:new_release_path', 'local:create_release'
    before 'local:create_release', 'local:set_current_revision'
  end
end
