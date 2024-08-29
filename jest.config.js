export default {
    transform: {
      '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['./jest.setup.cjs'],
};