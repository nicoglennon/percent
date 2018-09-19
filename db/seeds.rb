# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all

User.create! (
  {
    username: "nico"
  },
  {
    username: "chris"
  }
)
puts "Users seeded!"



Week.delete_all

Week.create! (
  [
    {
      date: "Sep 16",
      percentage: "99%"
    },
    {
      date: "Sep 9",
      percentage: "22%"
    },
    {
      date: "Sep 2",
      percentage: "46%"
    },
    {
      date: "Oct 25",
      percentage: "61%"
    },
    {
      date: "Oct 18",
      percentage: "43%"
    }
  ]
)

puts "Weeks seeded!"
