import {ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import LayoutGrid from '~/components/layouts/LayoutGrid';
import Page from '~/components/layouts/Page';
import MainCategory from '~/components/page/category/MainCategory';

function Category() {
	return (
		<Page disabledEffect title='Giày Nike'>
			<LayoutGrid>
				<MainCategory />
			</LayoutGrid>
		</Page>
	);
}

export default Category;

Category.getLayout = function (page: ReactElement) {
	return <BaseLayout>{page}</BaseLayout>;
};
