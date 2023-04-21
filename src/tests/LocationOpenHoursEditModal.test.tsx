import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach, beforeAll, afterAll } from 'vitest'
import { Provider } from 'react-redux';
import { setLocationOpenHoursEditModalOpen, store } from '@/features/modalSlide';
import LocationOpenHoursEditModal from '@/components/LocationOpenHoursEditModal';

describe('LocationOpenHoursEditModal', () => {

    beforeAll(() => {
        // add window.matchMedia
        // this is necessary for the date picker to be rendered in     desktop mode.
        // if this is not provided, the mobile mode is rendered, which might lead to unexpected behavior
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: query => ({
                media: query,
                // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
                matches: query === '(min-width:600px)',
                onchange: () => { },
                addEventListener: () => { },
                removeEventListener: () => { },
                addListener: () => { },
                removeListener: () => { },
                dispatchEvent: () => false,
            }),
        })
    });

    afterAll(() => {
        delete window.matchMedia
    })

    // dispatch the action to set locationOpenHoursEditModalOpen to true
    beforeEach(() => {
        store.dispatch(setLocationOpenHoursEditModalOpen(true))

        render(

            <Provider store={store}>
                <LocationOpenHoursEditModal />
            </Provider>
        );
    })



    test('renders the modal', () => {
        const title = screen.getByText('Edit opening hours');
        expect(title).toBeTruthy();
    });

    test('check if all days are rendered', () => {
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        daysOfWeek.forEach((day) => {
            const dayElement = screen.getByText(day);
            expect(dayElement.tagName).toEqual('P');
        })
    });

    test('switching date to open', () => {
        const switcher = screen.getAllByLabelText('Closed')
        fireEvent.click(switcher[0])
        const switchedSwitcher = screen.getAllByLabelText('Opened')
        expect(switchedSwitcher[0]).toBeTruthy();
    })

    test('check if entering later closing hour will throw error', async () => {

        const switcher = screen.getAllByLabelText('Closed')
        fireEvent.click(switcher[0])

        const openingHourField = screen.getAllByLabelText('Opening')[0];
        const closingHourField = screen.getAllByLabelText('Closing')[0];

        fireEvent.change(openingHourField, { target: { value: '8' } })
        console.log(openingHourField)
        // expect(openingHourField.value).toBe('8:00')
        console.log(store.getState().modal.locationData.openingHours.filter(day => day.day === 'Monday'))


    })

});