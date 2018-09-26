# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Week.delete_all

# create users
nico = User.new({ username: "nico" })
chris = User.new({ username: "chris" })
greta = User.new({ username: "greta" })


nico.save
chris.save
greta.save

puts "Users seeded!"

# create weeks
Week.create! (
  [
    {
      date: "Sep 16",
      percentage: "99%",
      user_id: nico.id
    },
    {
      date: "Sep 9",
      percentage: "22%",
      user_id: nico.id
    },
    {
      date: "Sep 2",
      percentage: "46%",
      user_id: nico.id
    },
    {
      date: "Oct 25",
      percentage: "61%",
      user_id: nico.id
    },
    {
      date: "Oct 18",
      percentage: "43%",
      user_id: chris.id
    },
    {
      date: "Oct 11",
      percentage: "31%",
      user_id: chris.id
    },
    {
      date: "Oct 4",
      percentage: "59%",
      user_id: chris.id
    },
    {
      date: "Aug 27",
      percentage: "88%",
      user_id: chris.id
    },
    {
      date: "Aug 20",
      percentage: "22%",
      user_id: chris.id
    },
    {
      date: "Aug 13",
      percentage: "65%",
      user_id: chris.id
    },
  ]
)

puts "Weeks seeded!"
