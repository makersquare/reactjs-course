require 'sinatra'
require 'json'
require_relative 'lib/awsumlink'

get '/' do
  erb :index
end

# Users

get '/users' do
  AwsumLink::Users.get_users.to_json
end

get '/user/:id' do
  AwsumLink::Users.get_user(params[:id].to_i).to_json
end

post '/user' do
  content_type :json
  if params.key?('username') and params.key?('password')
    result = AwsumLink::Users.create_user params[:username], params[:password]
    if result == true
      {
        :status => 200
      }.to_json
    else
      {
        :status => 500,
        :error  => result
      }.to_json
    end
  else
    {
      :status => 400,
      :error  => 'Invalid parameters.'
    }.to_json
  end
end

delete '/user/:id' do
  content_type :json
  result = AwsumLink::Users.delete_user(params[:id])
  if result == true
    {
      :status => 200
    }.to_json
  else
    content_type :json
    {
      :status => 500,
      :error  => result
    }.to_json
  end
end

# Lists
get '/user/:user_id/lists' do
  AwsumLink::Lists.get_lists_from_user(params[:user_id].to_i).to_json
end

get '/lists' do
  AwsumLink::Lists.get_lists.to_json
end

get '/list/:id' do
  AwsumLink::Lists.get_list(params[:id].to_i).to_json
end

post '/list' do
  content_type :json
  if params.key?('user_id') and params.key?('name')
    result = AwsumLink::Lists.create_list params[:user_id], params[:name]
    if result == true
      {
        :status => 200
      }.to_json
    else
      {
        :status => 500,
        :error  => result
      }.to_json
    end
  else
    {
      :status => 400,
      :error  => 'Invalid parameters.'
    }
  end
end

put '/list/:id' do
  content_type :json
  if params.key?('user_id') or params.key?('name')
    result = AwsumLink::Lists.update_list params[:id], params
    if result == true
      {
        :status => 200
      }.to_json
    else
      {
        :status => 500,
        :error  => result
      }.to_json
    end
  else
    {
      :status => 400,
      :error  => 'Invalid parameters.'
    }
  end
end

delete '/list/:id' do
  content_type :json
  result = AwsumLink::Lists.delete_list(params[:id])
  if result == true
    {
      :status => 200
    }.to_json
  else
    content_type :json
    {
      :status => 500,
      :error  => result
    }.to_json
  end
end

# Links - note that returning a list of links is done with /list/:user_id.
#         these methods are for manipulating individual items
get '/links' do
  AwsumLink::Links.get_links.to_json
end

post '/link' do
  content_type :json
  if params.key?('list_id') and params.key?('url') and \
     params.key?('name') and params.key?('description')
    result = AwsumLink::Links.create_link params[:list_id], params[:url], \
                                          params[:name], params[:description]
    if result == true
      {
        :status => 200
      }.to_json
    else
      {
        :status => 500,
        :error  => result
      }.to_json
    end
  else
    {
      :status => 400,
      :error  => 'Invalid parameters.'
    }
  end
end

put '/link/:id' do
  content_type :json
  if params.key?('url') or params.key?('name') or params.key?('description')
    result = AwsumLink::Links.update_link params[:id], params
    if result == true
      {
        :status => 200
      }.to_json
    else
      {
        :status => 500,
        :error  => result
      }.to_json
    end
  else
    {
      :status => 400,
      :error  => 'Invalid parameters.'
    }
  end
end

delete '/link/:id' do
  content_type :json
  result = AwsumLink::Links.delete_link(params[:id])
  if result == true
    {
      :status => 200
    }.to_json
  else
    content_type :json
    {
      :status => 500,
      :error  => result
    }.to_json
  end
end
