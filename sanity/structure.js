export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('News Articles')
        .child(S.documentTypeList('article').title('News Articles')),
      S.listItem()
        .title('Videos')
        .child(S.documentTypeList('video').title('Videos')),
      S.listItem()
        .title('Magazines')
        .child(S.documentTypeList('magazine').title('Magazines')),
      S.listItem()
        .title('Match Reports')
        .child(S.documentTypeList('matchReport').title('Match Reports')),
      S.divider(),
      S.listItem()
        .title('📸 Photo Gallery')
        .child(S.documentTypeList('photo').title('Photo Gallery')),
      S.listItem()
        .title('📤 Bulk Photo Upload')
        .child(S.documentTypeList('photoBulkUpload').title('Bulk Photo Upload')),
      S.divider(),
      S.listItem()
        .title('Home Page Settings')
        .child(S.document().schemaType('homeSettings').documentId('homeSettings')),
    ])