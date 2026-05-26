export default {
  name: 'upcomingMatchesBulk',
  title: 'Upcoming Matches (Bulk)',
  type: 'document',
  fields: [
    {
      name: 'competition',
      title: 'Competition',
      type: 'string',
      options: {
        list: [
          {title: 'AFL',             value: 'AFL'},
          {title: 'AFLW',            value: 'AFLW'},
          {title: 'SANFL',           value: 'SANFL'},
          {title: 'SANFLW',          value: 'SANFLW'},
          {title: 'Amateurs',        value: 'Amateur'},
          {title: "SAWFL Women's",   value: "SAWFL Women's"},
          {title: 'Country Football',value: 'Country Football'},
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'amateurGrade',
      title: 'Amateur / SAWFL Grade',
      type: 'string',
      description: 'Select grade for Amateurs or SAWFL Women\'s',
      options: {
        list: [
          {title: 'Division 1',          value: 'division-1'},
          {title: 'Division 2',          value: 'division-2'},
          {title: 'Division 3',          value: 'division-3'},
          {title: 'Division 4',          value: 'division-4'},
          {title: 'Division 5',          value: 'division-5'},
          {title: 'Division 6',          value: 'division-6'},
          {title: 'Division 7',          value: 'division-7'},
          {title: 'Division 1 Reserves', value: 'division-1-reserves'},
          {title: 'Division 2 Reserves', value: 'division-2-reserves'},
          {title: 'Division 3 Reserves', value: 'division-3-reserves'},
          {title: 'Division 4 Reserves', value: 'division-4-reserves'},
          {title: 'Division 5 Reserves', value: 'division-5-reserves'},
          {title: 'Division 6 Reserves', value: 'division-6-reserves'},
          {title: 'Division 7 Reserves', value: 'division-7-reserves'},
          {title: 'Division C1',         value: 'division-c1'},
          {title: 'Division C2',         value: 'division-c2'},
          {title: 'Division C3',         value: 'division-c3'},
          {title: 'Division C4',         value: 'division-c4'},
          {title: 'Division C5',         value: 'division-c5'},
          {title: 'Division C6',         value: 'division-c6'},
          {title: 'Division C7',         value: 'division-c7'},
          {title: 'Division C8',         value: 'division-c8'},
        ]
      },
      hidden: ({document}) => document?.competition !== 'Amateur' && document?.competition !== "SAWFL Women's"
    },
    {
      name: 'sanflGrade',
      title: 'SANFL Grade',
      type: 'string',
      options: {
        list: [
          {title: 'League',   value: 'league'},
          {title: 'Reserves', value: 'reserves'},
          {title: 'Under 18', value: 'under-18'},
          {title: 'Under 16', value: 'under-16'},
        ]
      },
      hidden: ({document}) => document?.competition !== 'SANFL'
    },
    {
      name: 'countryLeague',
      title: 'Country League',
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
      name: 'round',
      title: 'Round',
      type: 'string',
      description: 'e.g. Round 5',
      validation: Rule => Rule.required()
    },
    {
      name: 'matchDate',
      title: 'Match Date & Time',
      type: 'datetime',
      description: 'Date and time that applies to ALL matches in this paste (can be overridden per line)',
      validation: Rule => Rule.required()
    },
    {
      name: 'matches',
      title: 'Matches',
      type: 'text',
      rows: 15,
      description: 'Paste one match per line in format: Home Team v Away Team @ Venue',
      placeholder: 'St Peters OC v Sacred Heart OC @ St Peters College\nRostrevor OC v Golden Grove @ Campbelltown Memorial Oval',
      validation: Rule => Rule.required()
    },
  ],
  preview: {
    select: {
      competition: 'competition',
      round:       'round',
      matchDate:   'matchDate',
      amateurGrade: 'amateurGrade',
      sanflGrade:   'sanflGrade',
      countryLeague: 'countryLeague',
    },
    prepare({ competition, round, matchDate, amateurGrade, sanflGrade, countryLeague }) {
      const grade = amateurGrade ?? sanflGrade ?? countryLeague ?? ''
      const date  = matchDate ? new Date(matchDate).toLocaleDateString('en-AU') : ''
      return {
        title:    `${competition}${grade ? ' · ' + grade : ''} — ${round ?? ''}`,
        subtitle: date,
      }
    }
  }
}