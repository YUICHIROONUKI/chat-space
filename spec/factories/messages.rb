FactoryBot.define do

   factory :message do
   	image { File.open("#{Rails.root}/public/images/image.jpg")}
   	content { Faker::Lorem.sentence}
   	user
   	group
   end
end