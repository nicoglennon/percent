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

week_one = Week.new({ date: "Week with goals", percentage: "50%", user_id: nico.id})
week_one.save

puts "Week one seeded!"

# create test goals
goal_1 = Goal.new({title: "Brush teeth", completed: true, week_id: week_one.id})
goal_2 = Goal.new({title: "Walk Baker around the city", completed: false, week_id: week_one.id})
goal_3 = Goal.new({title: "Promote Mathbay in local coffeeshops / bars", completed: true, week_id: week_one.id})
goal_4 = Goal.new({title: "Focus on output, not input", completed: true, week_id: week_one.id})
goal_5 = Goal.new({title: "Make an inpact on latest project at work", completed: false, week_id: week_one.id})
goal_6 = Goal.new({title: "Help Greta with harmonica class", completed: true, week_id: week_one.id})
goal_7 = Goal.new({title: "Get application ID as soon as possible", completed: true, week_id: week_one.id})
goal_8 = Goal.new({title: "Sign up for YMCA", completed: false, week_id: week_one.id})


goal_1.save
goal_2.save
goal_3.save
goal_4.save
goal_5.save
goal_6.save
goal_7.save
goal_8.save


puts "Goals saved!"

puts week_one
puts week_one.goals

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
