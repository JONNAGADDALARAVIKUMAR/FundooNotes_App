import LocalizedStrings from 'react-native-localization';
import English from './English';
import Hindi from './Hindi';
import Telugu from './Telugu';
import Korea from './Korea';
import French from './French'

strings = new LocalizedStrings({
    "en-US": English,
    te: Telugu,
    hi: Hindi,
    "ko-KR": Korea,
    "fr-FR": French,
})

export  default strings;