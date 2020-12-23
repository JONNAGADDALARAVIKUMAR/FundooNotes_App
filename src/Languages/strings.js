import LocalizedStrings from 'react-native-localization';
import English from './LanguageFiles/English';
import Hindi from './LanguageFiles/Hindi';
import Telugu from './LanguageFiles/Telugu';
import Korea from './LanguageFiles/Korea';
import French from './LanguageFiles/French';
import Japanese from './LanguageFiles/Japanese';

strings = new LocalizedStrings({
    "en-US": English,
    te: Telugu,
    hi: Hindi,
    "ko-KR": Korea,
    "fr-FR": French,
    ja: Japanese
})

export let strings;