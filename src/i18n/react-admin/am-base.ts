import { TranslationMessages } from "react-admin";

/**
 * This file was originally copied from the ra-language-armenian repository.
 * Original Repository: https://github.com/mrdntgrn/ra-language-armenian
 * License: MIT License.
 * 
 * Modifications:
 * - Added additional translation keys.
 * - Customized some translations to better suit our application.
 */
const am: TranslationMessages = {
     ra: {
          action: {
               add_filter: 'Ավելացնել ֆիլտր',
               add: 'Ավելացնել',
               back: 'Վերադառնալ',
               bulk_actions: 'Ընտրված է 1 հատ |||| Ընտրված են %{smart_count} հատ',
               cancel: 'Չեղարկել',
               clear_array_input: "Մաքրել ցուցակը",
               clear_input_value: 'Մաքրել արժեքը',
               clone: 'Կրկնօրինակել',
               confirm: 'Հաստատել',
               create: 'Ստեղծել',
               create_item: "Ստեղծել %{item}",
               delete: 'Ջնջել',
               edit: 'Խմբագրել',
               export: 'Արտահանել',
               list: 'Ցուցակ',
               reset: "Վերակայել",
               search_columns: "Որոնել սյունները",
               refresh: 'Թարմացնել',
               remove_filter: 'Հեռացնել այս ֆիլտրը',
               remove_all_filters: "Հեռացնել բոլոր ֆիլտրները",
               remove: 'Հեռացնել',
               save: 'Պահպանել',
               search: 'Որոնել',
               select_all: "Ընտրել բոլորը",
               select_row: "Ընտրել այս գրառումը",
               show: 'Ցուցադրել',
               sort: 'Դասավորել',
               undo: 'Չեղարկել',
               unselect: "Չընտրված",
               expand: 'Բացել',
               close: 'Փակել',
               open_menu: "Բացել մենյուն",
               close_menu: "Փակել մենյուն",
               update: "Թարմացնել",
               move_up: "Տեղափոխել վերև",
               move_down: "Տեղափոխել ներքև",
               open: "Բացել",
               toggle_theme: "Փոխել տեսքը",
               select_columns: "Սյուններ",
               update_application: 'Թարմացնել հավելվածը',
               select_all_button: "Ընտրել բոլորը"
          },
          boolean: {
               true: 'Այո',
               false: 'Ոչ',
               null: ' ',
          },
          page: {
               create: 'Ստեղծել %{name}',
               dashboard: 'Տվյալների վահանակ',
               edit: '%{name} #%{id}',
               error: 'Վայ, մի բան սխալ տեղի ունեցավ։',
               list: '%{name}',
               loading: 'Բեռնվում է․․․',
               not_found: 'Չի գտնվել',
               show: '%{name} #%{id}',
               empty: '%{name}-ը չկա այս էջում',
               invite: "Ուզու՞մ եք ավելացնել ևս մեկ տող։",
               access_denied: "Մուտքը արգելված է",
               authentication_error: "Նույնականացման սխալ"
          },
          input: {
               file: {
                    upload_several: 'Գցեք այստեղ ֆայլերը կամ սեղմեք ու ընտրեք:',
                    upload_single: 'Գցեք այստեղ ֆայլը կամ սեղմեք ու ընտրեք:',
               },
               image: {
                    upload_several: 'Գցեք այստեղ նկարները կամ սեղմեք ու ընտրեք:',
                    upload_single: 'Գցեք այստեղ նկարը կամ սեղմեք ու ընտրեք:',
               },
               references: {
                    all_missing: 'Հղումով կապված տվյալները չեն գտնվել։',
                    many_missing: 'Հղումով կապված տվյալներից գոնե մեկը հասանելի չէ։',
                    single_missing: 'Հղումով կապված այս տվյալը հասանելի չէ։',
               },
               password: {
                    toggle_visible: 'Թաքցնել գաղտնաբառը',
                    toggle_hidden: 'Ցույց տալ գաղտնաբառը',
               },
          },
          message: {
               about: 'Տեղեկություն',
               are_you_sure: 'Դուք համոզվա՞ծ եք',
               auth_error: "Նույնականացման token-ը վավերացնելիս սխալ տեղի ունեցավ:",
               bulk_delete_content: 'Դուք համոզվա՞ծ եք ջնջել %{name}-ը |||| Դուք համոզվա՞ծ եք ջնջել %{smart_count} հատ օբյեկտներ',
               bulk_delete_title: 'Ջնջել %{name}-ը |||| Ջնջել %{smart_count} հատ %{name}',
               bulk_update_content: "Դուք համոզվա՞ծ եք թարմացնել %{name}-ը |||| Դուք համոզվա՞ծ եք թարմացնել %{smart_count} հատ օբյեկտներ",
               bulk_update_title: "Թարմացնել %{name}-ը |||| Թարմացնել %{smart_count} հատ %{name}",
               delete_content: 'Դուք համոզվա՞ծ եք ջնջել այս օբյեկտը',
               delete_title: 'Ջնջել %{name}-ը #%{id}',
               details: 'Մանրամասներ',
               error: 'Տեղի է ունեցել սխալ, և Ձեր հարցումը չի կարող կատարվել:',
               invalid_form: 'Ֆորման վավեր չէ։ Խնդրում ենք ստուգել սխալները',
               loading: 'Խնդրում ենք սպասել․․․',
               no: 'Ոչ',
               not_found: 'Սխալ URL հասցեի լրացում կամ դուք հետևել եք սխալ հղման։',
               yes: 'Այո',
               unsaved_changes: "Ձեր կատարած փոփոխությունները կարող են չպահպանվել: Վստա՞հ եք, որ ուզում եք անտեսել դրանք:",
               access_denied: "Խնդրում ենք ձեռք բերել այս էջը այցելելու թույլտվություն։",
               authentication_error: "Նույնականացումը ստուգելիս սերվերում սխալ առաջացավ։",
               clear_array_input: "Դուք համոզվա՞ծ եք, որ մաքրել այս ցուցակը։",
               select_all_limit_reached: "Բոլորը ընտրելու համար չափազանց շատ գրառումներ կան։ Ընտրվել են միայն առաջին %{max} գրառումները",
               placeholder_data_warning: "Կապի խնդիր՝ տվյալների թարմացումը ձախողվել է։"
          },
          navigation: {
               no_results: 'Ոչ մի արդյունք չի գտնվել',
               no_filtered_results: "%{name} ընթացիկ ֆիլտրով չի գտնվել։",
               clear_filters: "Մաքրել ֆիլտրները",
               no_more_results: '%{page}-րդ էջը դուրս է սահմաններից։ Փորձեք վերադառնալ նախորդ էջ:',
               page_out_of_boundaries: '%{page}-րդ էջը դուրս է սահմաններից։',
               page_out_from_end: 'Անհնար է անցնել վերջին էջից',
               page_out_from_begin: 'Անհնար է անցնել 1-ին էջից առաջ',
               page_range_info: '%{offsetBegin}-%{offsetEnd} %{total}-ից',
               partial_page_range_info: "%{offsetBegin}-%{offsetEnd}՝ ավելի քան %{offsetEnd}",
               current_page: "%{page}-րդ էջ",
               page: "Անցնել %{page}-րդ էջ",
               first: "Անցնել առաջին էջ",
               last: "Անցնել վերջին էջ",
               next: 'Հաջորդ էջ',
               previous: 'Նախորդ էջ',
               page_rows_per_page: 'Տողերի քանակը մեկ էջում.',
               skip_nav: "Անցնել բովանդակությանը",
          },
          sort: {
               ASC: "Աճման կարգով",
               DESC: "Նվազման կարգով",
               sort_by: "Դասավորել ըստ %{field} %{order}"
          },
          auth: {
               auth_check_error: 'Խնդրում ենք մուտք գործել՝ շարունակելու համար',
               user_menu: 'Անձնական կարգավորումներ',
               username: 'Օգտանուն',
               password: 'Գաղտնաբառ',
               email: "Էլ․ հասցե",
               sign_in: 'Մուտք',
               sign_in_error: 'Նույնականացումը չհաջողվեց, խնդրում ենք փորձել նորից',
               logout: 'Դուրս գալ',
          },
          notification: {
               offline: "Կապից դուրս",
               updated: 'Օբյեկտը թարմացվեց |||| %{smart_count} հատ օբյեկտ թարմացվեց',
               created: 'Օբյեկտը ստեղծվեց',
               deleted: 'Օբյեկտը ջնջվեց |||| %{smart_count} հատ օբյեկտ ջնջվեց',
               bad_item: 'Սխալ օբյեկտ',
               item_doesnt_exist: 'Օբյեկտը գոյություն չունի',
               http_error: 'Սերվերի հետ կապի խնդիր',
               data_provider_error: 'dataProvider-ի խնդիր։ Ստուգեք վահանակը (console) մանրամասների համար։',
               i18n_error: 'Չհաջողվեց բեռնել նշված լեզվով թարգմանությունները',
               canceled: 'Գործողությունը չեղարկված է',
               logged_out: 'Ձեր սեսիան ավարտվեց, խնդրում ենք նորից մուտք գործել:',
               not_authorized: "Դուք չունեք բավարար թույլտվություն մուտք գործելու այս ռեսուրսին:",
               application_update_available: "Այս հավելվածի նոր վերսիան հասանելի է։"
          },
          validation: {
               required: 'Պարտադիր է',
               minLength: 'Պենք է պարունակի %{min} կամ ավել նիշ',
               maxLength: 'Պենք է պարունակի %{max} կամ պակաս նիշ',
               minValue: 'Պենք է լինի %{min} կամ ավել',
               maxValue: 'Պենք է լինի %{max} կամ պակաս',
               number: 'Պենք է լինի թիվ',
               email: 'Պենք է լինի վավեր էլ․ հասցե',
               oneOf: 'Պենք է լինի հետևյալ տարբերակներից մեկը. %{options}',
               regex: 'Պետք է համապատասխանի հատուկ ֆորմատին (regexp): %{pattern}',
          },
          saved_queries: {
               label: "Պահպանված հարցումներ",
               query_name: "Հարցման անուն",
               new_label: "Պահպանել այս հարցումը",
               new_dialog_title: "Պահպանել այս հարցումը որպես",
               remove_label: "Ջնջել պահպանված հարցումը",
               remove_label_with_name: 'Ջնջել "%{name}" հարցումը',
               remove_dialog_title: "Ջնջե՞լ այս հարցումը։",
               remove_message: "Դուք համոզվա՞ծ եք, որ ցանկանում եք ջնջել այդ հարցումը Ձեր պահպանված հարցումների ցուցակից:",
               help: "Ֆիլտրավորել ցուցակը և պահպանել այս հարցումը ավելի ուշ"
          },
          configurable: {
               customize: "Կարգավորել",
               configureMode: "Կարգավորել այս էջը",
               inspector: {
                    title: "Ինսպեկտոր",
                    content: "Հավելվածի UI էլեմենտների վրա շարժեք մկնիկը՝ կարգավորելու համար:",
                    reset: "Վերականգնել կարգավորումները",
                    hideAll: "Թաքցնել բոլորը",
                    showAll: "Ցույց տալ բոլորը"
               },
               Datagrid: {
                    title: "Տվյալների աղյուսակ",
                    unlabeled: "Անանուն սյուն #%{column}"
               },
               SimpleForm: {
                    title: "Ֆորմա",
                    unlabeled: "Անանուն դաշտ #%{input}"
               },
               SimpleList: {
                    title: "Ցուցակ",
                    primaryText: "Առաջնային տեքստ",
                    secondaryText: "Երկրորդական տեքստ",
                    tertiaryText: "Երրորդական տեքստ"
               }
          }
     },
};

export default am