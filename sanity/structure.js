export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // SITE SETTINGS (Singleton)
      S.listItem()
        .title('⚙️ Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      
      S.divider(),
      
      // CUSTOM PAGES
      S.listItem()
        .title('📄 Custom Pages')
        .child(
          S.documentTypeList('customPage')
            .title('Custom Pages')
        ),
      
      S.divider(),
      
      // CONTENT
      S.listItem()
        .title('📰 Editorials')
        .child(
          S.documentTypeList('editorial')
            .title('Editorials')
        ),
      S.listItem()
        .title('🏈 Match Results')
        .child(
          S.documentTypeList('matchResult')
            .title('Match Results')
        ),
      S.listItem()
        .title('📖 Magazines')
        .child(
          S.documentTypeList('magazine')
            .title('Magazines')
        ),
      S.listItem()
        .title('🎥 Videos')
        .child(
          S.documentTypeList('video')
            .title('Videos')
        ),
      S.listItem()
        .title('📸 Photos')
        .child(
          S.documentTypeList('photo')
            .title('Photos')
        ),
      S.listItem()
        .title('📤 Photo Bulk Upload')
        .child(
          S.documentTypeList('photoBulkUpload')
            .title('Photo Bulk Upload')
        ),
    ])