# Homepage (Root path)
get '/' do
  erb :index
end

get '/add_contact_form' do
  erb 'contacts/add_contact_form'
end

get '/show_contact_form' do
  erb 'contacts/show_contact_form'
end

post '/contacts' do

  result = {succeeded: false, message: '', contact: {}}

  contact = Contact.new(
     firstname:   params[:firstname],
     lastname:    params[:lastname],
     email:       params[:email]
   )
   if contact.save
      # pass back success message
      result[:succeeded] = true
      result[:message] = 'Saved new Contact to database.'
      result[:contact] = contact
   end

   content_type :json
   result.to_json
end

get '/contacts/:id' do

   Contact.find(params[:id].to_i).to_json

end

get '/contacts' do

  Contact.all.to_json

end

get '/jsonp' do
  callback = params['callback']
  content_type :js
  content = { :response  => 'Sent via JSONP',
              :timestamp => Time.now,
              :random    => rand(10000) }
  "#{callback}(#{content.to_json})"
end


# post '/new_player' do
#   results = {result: false}
#   name = params[:name]
#   position = params[:position]
#   weight = params[:weight]

#   player = Player.new name: name, position: position, weight: weight

#   if player.save
#     results[:result] = true
#     results[:player_id] = player.id
#   end

#   results.to_json
# end
