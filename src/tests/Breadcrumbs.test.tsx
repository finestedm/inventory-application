import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BreadcrumbsComponent from '@/components/Breadcrumbs';
import { describe, test, expect } from 'vitest'

describe('BreadcrumbsComponent', () => {
    test('renders the Home link when the pathnames array is empty', () => {
        render(
            <MemoryRouter>
                <BreadcrumbsComponent />
            </MemoryRouter>
        );

        const breadcrumbNav = screen.getByLabelText('breadcrumb');
        expect(breadcrumbNav).toBeTruthy();
    });

    // test('renders the pathnames correctly', () => {
    //     render(
    //         <MemoryRouter initialEntries={['/path1/path2']}>
    //             <BreadcrumbsComponent />
    //         </MemoryRouter>
    //     );

    //     const homeLink = screen.getByRole('link', { name: /home/i });
    //     const link1 = screen.getByRole('link', { name: /path1/i });
    //     const link2 = screen.getByRole('heading', { name: /path2/i });

    //     expect(homeLink).toBeInTheDocument();
    //     expect(link1).toBeInTheDocument();
    //     expect(link2).toBeInTheDocument();
    // });
});