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

    it('renders the list of tags', async () => {
        // Mock the axios.get() call
        axiosMock.onGet('/tags').reply(200, [
            { _id: '1', name: 'Tag1' },
            { _id: '2', name: 'Tag2' },
            { _id: '3', name: 'Tag3' },
        ]);

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


    it('shows a loading indicator while tags are being fetched', async () => {
        // Mock the axios.get() call
        axiosMock.onGet('/tags').reply(() => {
            return new Promise((resolve) => setTimeout(() => resolve([200, []]), 1000));
        });

        // Render the component
        render(<TagCloud />);

        // Verify that the loading indicator is displayed
        expect(screen.getByRole('progressbar')).toBeTruthy();

        // Wait for the tags to load
        await screen.findByRole('link');

        // Verify that the loading indicator is no longer displayed
        expect(screen.queryByRole('progressbar')).toBeNull();
    });

    it('displays tags when they are fetched', async () => {
        // Mock the axios.get() call
        const mockTags = [{ _id: 1, name: 'tag1' }, { _id: 2, name: 'tag2' }];
        axiosMock.onGet('/tags').reply(200, mockTags);

        // Render the component
        render(<TagCloud />);

        // Wait for the tags to load
        await screen.findByRole('link');

        // Verify that the tags are displayed
        const tagLinks = screen.getAllByRole('link');
        expect(tagLinks).toHaveLength(2);
        // expect(tagLinks[0]).toHaveAttribute('href', '/catalog/tags/tag1');
        // expect(tagLinks[0]).toHaveTextContent('tag1');
        // expect(tagLinks[1]).toHaveAttribute('href', '/catalog/tags/tag2');
        // expect(tagLinks[1]).toHaveTextContent('tag2');
    });
});