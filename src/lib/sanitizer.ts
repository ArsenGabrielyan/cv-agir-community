import sanitizeHtml from "sanitize-html";

export function sanitizeHTML(dirty: string) {
     return sanitizeHtml(dirty,{
          allowedTags: [
               'h1','h2','h3','h4','h5','h6',
               'p','br','hr',
               'b','i','em','strong','u','s','mark',
               'a','img',
               'ul','ol','li',
               'table','thead','tbody','tr','th','td',
               'blockquote','pre','code',
               'div','span'
          ],
          allowedAttributes: {
               a: ['href', 'title', 'target', 'rel'],
               img: ['src', 'alt', 'width', 'height'],
               '*': ['class']
          },
          allowedSchemesByTag: {
               a: ['http', 'https', 'mailto', 'tel'],
               img: ['http', 'https']
          },
          allowedSchemes: ['http', 'https', 'mailto', 'tel', "blob"],
          disallowedTagsMode: 'discard',
          transformTags: {
               'a': (tagName, attribs) => ({
                    tagName,
                    attribs: {
                    ...attribs,
                    target: '_blank',
                    rel: 'noopener noreferrer nofollow'
                    }
               })
          },
          enforceHtmlBoundary: true,
     });
}