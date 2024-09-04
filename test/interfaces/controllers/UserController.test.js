const UserRepository = require('../../../lib/domain/repository/UserRepository')
const mockUserRepository = new UserRepository();
const ListUsers = require('../../../lib/domain/use_cases/GetUserList')

test('should resolve with all the users persisted in repository', async () => {
  // given
  mockUserRepository.find = () => ['murat'];

  // when
  const users = await ListUsers({ userRepository: mockUserRepository });

  // then
  expect(users).toEqual(['murat']);
});
