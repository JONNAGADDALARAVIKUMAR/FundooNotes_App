import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import RNLocalization from '../_mocks_/react-native-localization';
//import keychainMock from '.././_mocks_/react-native-keychain';
//import firebaseMock from '.././_mocks_/react-native-firebase';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-localization', () => RNLocalization)

//jest.mock('react-native-keychain', () => keychainMock);
//jest.mock('react-native-firebase', () => firebaseMock);