export default {
  name: 'upcomingMatch',
  title: 'Upcoming Match',
  type: 'document',
  fields: [
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
      name: 'matchDate',
      title: 'Match Date & Time',
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
      name: 'competition',
      title: 'Competition',
      type: 'string',
      options: {
        list: [
          {title: 'AFL', value: 'AFL'},
          {title: 'AFLW', value: 'AFLW'},
          {title: 'SANFL', value: 'SANFL'},
          {title: 'SANFLW', value: 'SANFLW'},
          {title: 'Amateurs', value: 'Amateur'},
          {title: "SAWFL Women's", value: "SAWFL Women's"},
          {title: 'Country Football', value: 'Country Football'},
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'countryLeague',
      title: 'Country League (only for Country Football)',
      type: 'string',
      options: {
        list: [
          {title: 'Adelaide Plains', value: 'adelaide-plains'},
          {title: 'Barossa Light & Gawler', value: 'barossa'},
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
      name: 'notes',
      title: 'Notes (optional)',
      type: 'string',
      description: 'e.g. Finals match, Grand Final, Derby'
    }
  ],
  preview: {
    select: {
      homeTeam: 'homeTeam',
      awayTeam: 'awayTeam',
      matchDate: 'matchDate',
      competition: 'competition'
    },
    prepare: ({homeTeam, awayTeam, matchDate, competition}) => ({
      title: `${homeTeam} vs ${awayTeam}`,
      subtitle: `${competition} · ${matchDate ? new Date(matchDate).toLocaleDateString('en-AU') : ''}`
    })
  }
}