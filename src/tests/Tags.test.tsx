import Tags from '@/Pages/Tags'
import { render, screen } from '@testing-library/react'
import { describe, it, beforeEach, expect, afterEach } from 'vitest'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Tags', () => {
    let axiosMock: MockAdapter;

    beforeEach(() => {
        axiosMock = new MockAdapter(axios);
    });

    afterEach(() => {
        axiosMock.reset();
    });

    it('renders the list of tags', async () => {
        // Mock the axios.get() call
        axiosMock.onGet('/tags').reply(200, [
            { _id: '1', name: 'Tag1' },
            { _id: '2', name: 'Tag2' },
            { _id: '3', name: 'Tag3' },
        ]);

        // Render the component
        render(<Tags />);

        // Wait for the tags to load
        await screen.findByText('Tag1');
        await screen.findByText('Tag2');
        await screen.findByText('Tag3');

        // Verify that the tags are displayed
        expect(screen.getByText('Tag1')).toBeTruthy();
        expect(screen.getByText('Tag2')).toBeTruthy();
        expect(screen.getByText('Tag3')).toBeTruthy();
    });
});