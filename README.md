# 🌼 Percent

<img width="600" src="https://github.com/nicoglennon/percent/blob/master/app/assets/images/flowerpick.jpg?raw=true" />

![version 1.0.0](https://img.shields.io/github/package-json/v/nicoglennon/percent.svg)

## About

Percent is a project built by Nico Glennon (https://nico.gl). You can find out more about it on Product Hunt below:

<a href="https://www.producthunt.com/posts/percent?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-percent" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=147344&theme=dark" alt="Percent - Stop reliving the same day over and over | Product Hunt Embed" style="width: 250px; height: 54px;" width="250px" height="54px" /></a>

## Running Locally

Make sure you have [Ruby (2.4.2)](https://www.ruby-lang.org), [Bundler](http://bundler.io), [Foreman](https://github.com/ddollar/foreman) and [Yarn](http://yarnpkg.com) installed. 

```sh
git clone git@github.com:nicoglennon/percent.git
cd percent
bundle
yarn
rails db:create db:migrate # create & migrate postgres db
foreman start -f Procfile.dev -p 3000 # starts both the Webpack and Rails servers
```
Then head over to `http://localhost:3000` to see the app served.

## Development

Feel free to submit a PR or submit and issue or suggestion for future features / direction of the app!

Percent integrates with Mailchimp & Sendgrid for serving onboarding emails & updating the weekly newletter recipients. If you want to work/upgrade these features, make sure you create a file in `/config` called `local_env.yml` to look like this:
```sh
SENDGRID_USERNAME: 'username@sendgrid.com' # sendgrid account that will fire off welcome and goodbye emails
SENDGRID_PASSWORD: 'yoursendgridpassword'

MAILCHIMP_API_KEY: 'yourmailchimpapikey'
TEST_MAILCHIMP_LISTID: 'listid' # id of the list users will be added/removed from during testing
```

## Roadmap 

You can find this project's public roadmap hosted on Notion [here](https://www.notion.so/404ab2f97bf54e728cdbe8f552ca9ffc?v=3e5fe998eebd4524bc1babd185c71e86). Feel free to message me on [Twitter](https://twitter.com/nicoglennon) if you have any feature requests!

## License

[MIT](LICENSE)
