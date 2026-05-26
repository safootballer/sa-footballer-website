export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('⚙️ Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      S.listItem()
        .title('📄 Custom Pages')
        .child(S.documentTypeList('customPage').title('Custom Pages')),

      S.divider(),

      S.listItem()
        .title('📰 Editorials')
        .child(S.documentTypeList('editorial').title('Editorials')),
      S.listItem()
        .title('🏈 Match Results')
        .child(S.documentTypeList('matchResult').title('Match Results')),
      S.listItem()
        .title('📅 Upcoming Matches (Bulk)')
        .child(S.documentTypeList('upcomingMatchesBulk').title('Upcoming Matches (Bulk)')),
      S.listItem()
        .title('📖 Magazines')
        .child(S.documentTypeList('magazine').title('Magazines')),
      S.listItem()
        .title('🎥 Videos')
        .child(S.documentTypeList('video').title('Videos')),
      S.listItem()
        .title('📸 Photos')
        .child(S.documentTypeList('photo').title('Photos')),
      S.listItem()
        .title('📤 Photo Bulk Upload')
        .child(S.documentTypeList('photoBulkUpload').title('Photo Bulk Upload')),

      S.divider(),

      S.listItem()
        .title('🏆 AFL Ladder (Paste)')
        .child(S.documentTypeList('aflLadder').title('AFL Ladder')),
      S.listItem()
        .title('🏉 AFL Goal Kickers (Paste)')
        .child(S.documentTypeList('aflGoalKickers').title('AFL Goal Kickers')),
      S.listItem()
        .title('🏆 League Ladders')
        .child(S.documentTypeList('ladder').title('League Ladders')),
      S.listItem()
        .title('🏉 Goal Kickers')
        .child(S.documentTypeList('goalKickers').title('Goal Kickers')),

      S.divider(),

      S.listItem()
        .title('📧 Subscribers')
        .child(S.documentTypeList('subscriber').title('Subscribers')),
    ])