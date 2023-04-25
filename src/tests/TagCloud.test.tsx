import TagCloud from '@/components/TagCloud'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, beforeEach, expect, afterEach } from 'vitest'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Tags', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });

    afterEach(() => {
        axiosMock.restore();
    });

    const tags = [
        { _id: '1', name: 'Tag1' },
        { _id: '2', name: 'Tag2' },
        { _id: '3', name: 'Tag3' },
    ]

    it('renders the list of tags', async () => {
        // Mock the axios.get() call
        axiosMock.onGet('/tags').reply(200, tags);

        // Render the component
        render(<TagCloud />);

        // Wait for the tags to load
        await screen.findByText('Tag1');
        await screen.findByText('Tag2');
        await screen.findByText('Tag3');

        // Verify that the tags are displayed
        expect(screen.getByText('Tag1')).toBeTruthy();
        expect(screen.getByText('Tag2')).toBeTruthy();
        expect(screen.getByText('Tag3')).toBeTruthy();
    });


    it('displays a loading spinner when fetching tags', async () => {
        // Mock the axios get() call to return an empty array
        axiosMock.onGet('/tags').reply(200, []);

        // Render the TagCloud component
        render(<TagCloud />)

        // Verify that the loading spinner is displayed
        expect(screen.getByRole('progressbar')).toBeTruthy()

        // Wait for the component to finish loading
        await waitFor(() => {
            expect(screen.queryByRole('progressbar')).toBeFalsy()
        })
    })

    it('displays tags when they are fetched', async () => {
        // Mock the axios get() call to return some tags
        axiosMock.onGet('/tags').reply(200, tags)

        // Render the TagCloud component
        render(<TagCloud />)

        // Wait for the component to finish loading
        await waitFor(() => {
            expect(screen.queryByRole('progressbar')).toBeFalsy()
        })

        // Verify that the tags are displayed
        expect(screen.getByText('Tag1')).toBeTruthy()
        expect(screen.getByText('Tag2')).toBeTruthy()
    })
});