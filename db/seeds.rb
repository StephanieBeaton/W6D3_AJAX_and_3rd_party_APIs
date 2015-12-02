require 'ffaker'

20.times  do
  Contact.create(
    firstname:  FFaker::Name.first_name,
    lastname:   FFaker::Name.last_name,
    email:      FFaker::Internet.email
  )
end
