import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import keychainMock from '.././_mocks_/react-native-keychain';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-native-keychain', () => keychainMock);