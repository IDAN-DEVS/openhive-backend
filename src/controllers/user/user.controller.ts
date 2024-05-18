import { AppResponse } from '@/common/utils';
import { catchAsync } from '@/middlewares';

export const getUser = catchAsync(async (req, res) => {
	return AppResponse(
		res,
		200,
		{
			name: 'John',
			age: 30,
		},
		'User fetched successfully'
	);
});
