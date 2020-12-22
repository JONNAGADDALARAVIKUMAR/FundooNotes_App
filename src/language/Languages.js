import LocalizedStrings from 'react-native-localization';
import English from './Languages/English';
import Hindi from './Languages/Hindi';
import Telugu from './Languages/Telugu';
import Korea from './Languages/Korea';
import French from './Languages/French';
import Japanese from './Languages/Japanese';

strings = new LocalizedStrings({
    "en-US": English,
    te: Telugu,
    hi: Hindi,
    "ko-KR": Korea,
    "fr-FR": French,
    ja: Japanese
})

export  default strings;