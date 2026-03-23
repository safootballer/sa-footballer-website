export default {
  name: 'matchResult',
  title: 'Match Result',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'competition',
      title: 'Competition',
      type: 'string',
      options: {
        list: [
          {title: 'AFL', value: 'AFL'},
          {title: 'AFLW', value: 'AFLW'},
          {title: 'SANFL', value: 'SANFL'},
          {title: 'SANFLW', value: 'SANFLW'},
          {title: 'Amateur', value: 'Amateur'},
          {title: "SAWFL Women's", value: "SAWFL Women's"},
          {title: 'Country Football', value: 'Country Football'},
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'countryLeague',
      title: 'Country League (Only for Country Football)',
      type: 'string',
      options: {
        list: [
          {title: 'Adelaide Plains', value: 'adelaide-plains'},
          {title: 'Barossa Light & Gawler', value: 'barossa'},
          {title: 'Broken Hill', value: 'broken-hill'},
          {title: 'Eastern Eyre', value: 'eastern-eyre'},
          {title: 'Far North', value: 'far-north'},
          {title: 'Great Flinders', value: 'great-flinders'},
          {title: 'Great Southern', value: 'great-southern'},
          {title: 'Hills Division 1', value: 'hills-div1'},
          {title: 'Hills Country Division', value: 'hills-country'},
          {title: 'Kangaroo Island', value: 'kangaroo-island'},
          {title: 'Kowree Naracoorte Tatiara', value: 'knt'},
          {title: 'Limestone Coast', value: 'limestone-coast'},
          {title: 'Murray Valley', value: 'murray-valley'},
          {title: 'Mid South Eastern', value: 'mid-south-eastern'},
          {title: 'North Eastern', value: 'north-eastern'},
          {title: 'Northern Areas', value: 'northern-areas'},
          {title: 'Port Lincoln', value: 'port-lincoln'},
          {title: 'River Murray', value: 'river-murray'},
          {title: 'Riverland', value: 'riverland'},
          {title: 'Southern', value: 'southern'},
          {title: 'Spencer Gulf', value: 'spencer-gulf'},
          {title: 'Western Eyre', value: 'western-eyre'},
          {title: 'Whyalla', value: 'whyalla'},
          {title: 'Yorke Peninsula', value: 'yorke-peninsula'},
        ]
      },
      hidden: ({document}) => document?.competition !== 'Country Football'
    },
    {
      name: 'homeTeam',
      title: 'Home Team',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'awayTeam',
      title: 'Away Team',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'homeScore',
      title: 'Home Score',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'awayScore',
      title: 'Away Score',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'matchDate',
      title: 'Match Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'string'
    },
    {
      name: 'round',
      title: 'Round',
      type: 'string'
    },
    {
      name: 'content',
      title: 'Match Report Content',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string'
    }
  ],
  preview: {
    select: {
      homeTeam: 'homeTeam',
      awayTeam: 'awayTeam',
      homeScore: 'homeScore',
      awayScore: 'awayScore',
      competition: 'competition'
    },
    prepare({homeTeam, awayTeam, homeScore, awayScore, competition}) {
      return {
        title: `${homeTeam} ${homeScore} - ${awayScore} ${awayTeam}`,
        subtitle: competition
      }
    }
  }
}