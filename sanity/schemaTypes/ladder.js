export default {
  name: 'ladder',
  title: 'League Ladder',
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
      options: { source: 'title', maxLength: 200 },
      validation: Rule => Rule.required()
    },
    {
      name: 'competition',
      title: 'Competition',
      type: 'string',
      options: {
        list: [
          {title: 'AFL',                          value: 'AFL'},
          {title: 'SANFL',                        value: 'SANFL'},
          {title: 'SANFLW',                       value: 'SANFLW'},
          {title: "Adelaide Footy League (Men's)", value: 'Amateur'},
          {title: "SAWFL Women's",                value: "SAWFL Women's"},
          {title: 'Country Football',             value: 'Country Football'},
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
          {title: 'Adelaide Plains',           value: 'adelaide-plains'},
          {title: 'Barossa Light & Gawler',    value: 'barossa'},
          {title: 'Eastern Eyre',              value: 'eastern-eyre'},
          {title: 'Far North',                 value: 'far-north'},
          {title: 'Great Flinders',            value: 'great-flinders'},
          {title: 'Great Southern',            value: 'great-southern'},
          {title: 'Hills Division 1',          value: 'hills-div1'},
          {title: 'Hills Country Division',    value: 'hills-country'},
          {title: 'Kangaroo Island',           value: 'kangaroo-island'},
          {title: 'Kowree Naracoorte Tatiara', value: 'knt'},
          {title: 'Limestone Coast',           value: 'limestone-coast'},
          {title: 'Murray Valley',             value: 'murray-valley'},
          {title: 'Mid South Eastern',         value: 'mid-south-eastern'},
          {title: 'North Eastern',             value: 'north-eastern'},
          {title: 'Northern Areas',            value: 'northern-areas'},
          {title: 'Port Lincoln',              value: 'port-lincoln'},
          {title: 'River Murray',              value: 'river-murray'},
          {title: 'Riverland',                 value: 'riverland'},
          {title: 'Southern',                  value: 'southern'},
          {title: 'Spencer Gulf',              value: 'spencer-gulf'},
          {title: 'Western Eyre',              value: 'western-eyre'},
          {title: 'Whyalla',                   value: 'whyalla'},
          {title: 'Yorke Peninsula',           value: 'yorke-peninsula'},
        ]
      },
      hidden: ({document}) => document?.competition !== 'Country Football'
    },
    {
      name: 'gradeName',
      title: 'Grade Name',
      type: 'string',
      description: 'e.g. Division 1, A-Grade, Reserves'
    },
    {
      name: 'season',
      title: 'Season',
      type: 'string',
    },
    {
      name: 'syncedAt',
      title: 'Last Synced',
      type: 'datetime',
    },
    {
      name: 'teams',
      title: 'Teams',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'rank',          title: 'Rank',           type: 'number'},
          {name: 'teamName',      title: 'Team Name',      type: 'string'},
          {name: 'played',        title: 'Played',         type: 'number'},
          {name: 'wins',          title: 'Wins',           type: 'number'},
          {name: 'losses',        title: 'Losses',         type: 'number'},
          {name: 'draws',         title: 'Draws',          type: 'number'},
          {name: 'byes',          title: 'Byes',           type: 'number'},
          {name: 'points',        title: 'Points',         type: 'number'},
          {name: 'percentage',    title: 'Percentage',     type: 'number'},
          {name: 'pointsFor',     title: 'Points For',     type: 'number'},
          {name: 'pointsAgainst', title: 'Points Against', type: 'number'},
          {name: 'forfeits',      title: 'Forfeits',       type: 'number'},
        ],
        preview: {
          select: { rank: 'rank', teamName: 'teamName', points: 'points' },
          prepare: ({rank, teamName, points}) => ({
            title: `${rank}. ${teamName}`,
            subtitle: `${points} pts`
          })
        }
      }]
    }
  ],
  preview: {
    select: { title: 'title', competition: 'competition', gradeName: 'gradeName' },
    prepare: ({title, competition, gradeName}) => ({
      title,
      subtitle: `${competition}${gradeName ? ' · ' + gradeName : ''}`
    })
  }
}