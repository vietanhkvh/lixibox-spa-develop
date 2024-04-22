require "capistrano/setup"
require "capistrano/deploy"
require_relative 'lib/capistrano/scm/local'

install_plugin Capistrano::SCM::Local

Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
