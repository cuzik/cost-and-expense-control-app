FROM ruby:2.6.2

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev postgresql-client

RUN apt-get install -y aptitude && aptitude install -y graphviz

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -qq -y build-essential nodejs yarn

RUN mkdir -p /app
WORKDIR /app

ADD ./Gemfile ./Gemfile.lock ./

RUN gem install bundler && bundle install

ADD ./yarn.lock ./package.json ./

RUN yarn install

ADD . ./

RUN cp config/database.sample.yml config/database.yml
