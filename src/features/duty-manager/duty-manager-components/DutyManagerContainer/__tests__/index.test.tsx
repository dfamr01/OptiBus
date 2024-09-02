import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import DutyManagerContainer from '..';

// Mock the utility functions
jest.mock('../../../../../shared/utils', () => ({
  formatDateFromISOString: jest.fn(date => '1st Nov'),
  formatTimeFromISOString: jest.fn(time => time.split('T')[1].slice(0, 5)),
}));
// Mock the data import
jest.mock('../../../../../data.json', () => [
  { id: '140', depot: 'Ealing', name: 'Duty 140', start: '2023-11-01T05:15:00', end: '2023-11-01T08:45:00' },
  { id: '151', depot: 'Westminster', name: 'Duty 151', start: '2023-11-01T07:30:00', end: '2023-11-01T12:00:00' },
  { id: '110', depot: 'Edmonton', name: 'Duty 110', start: '2023-11-01T08:00:00', end: '2023-11-01T12:30:00' },
  { id: '141', depot: 'Ealing', name: 'Duty 141', start: '2023-11-01T08:15:00', end: '2023-11-01T13:30:00' },
  { id: '131', depot: 'Brent Cross', name: 'Duty 131', start: '2023-11-01T09:00:00', end: '2023-11-01T12:30:00' },
  { id: '121', depot: 'Finsbury Park', name: 'Duty 121', start: '2023-11-01T11:30:00', end: '2023-11-01T17:00:00' },
  { id: '130', depot: 'Brent Cross', name: 'Duty 130', start: '2023-11-01T13:00:00', end: '2023-11-01T17:00:00' },
  { id: '120', depot: 'Finsbury Park', name: 'Duty 120', start: '2023-11-01T13:30:00', end: '2023-11-01T19:45:00' },
]);

const findDutyCard = (container, dutyName) => {
  const buttons = within(container).queryAllByRole('button');
  return buttons.find(button => button.textContent.includes(dutyName)) || null;
};

describe('DutyManagerContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders available and assigned duty lists', () => {
    render(<DutyManagerContainer />);

    expect(screen.getByText('Available duties')).toBeInTheDocument();
    expect(screen.getByText("Duties you've signed up for")).toBeInTheDocument();
  });

  it('displays all available duties initially', () => {
    render(<DutyManagerContainer />);

    const availableDutiesList = screen.getByText('Available duties').closest('div');
    expect(availableDutiesList).toBeInTheDocument();

    expect(findDutyCard(availableDutiesList, 'Duty 140')).toBeInTheDocument();
    expect(findDutyCard(availableDutiesList, 'Duty 151')).toBeInTheDocument();
    expect(findDutyCard(availableDutiesList, 'Duty 110')).toBeInTheDocument();
    expect(findDutyCard(availableDutiesList, 'Duty 141')).toBeInTheDocument();
    expect(findDutyCard(availableDutiesList, 'Duty 131')).toBeInTheDocument();
    expect(findDutyCard(availableDutiesList, 'Duty 121')).toBeInTheDocument();
    expect(findDutyCard(availableDutiesList, 'Duty 130')).toBeInTheDocument();
    expect(findDutyCard(availableDutiesList, 'Duty 120')).toBeInTheDocument();
  });



  it('allows assigning a duty', () => {
    render(<DutyManagerContainer />);

    const availableDutiesList = screen.getByText('Available duties').closest('div');
    const duty140 = findDutyCard(availableDutiesList, 'Duty 140');
    expect(duty140).not.toBeNull();
    fireEvent.click(duty140);

    const assignedDutiesList = screen.getByText("Duties you've signed up for").closest('div');
    expect(findDutyCard(assignedDutiesList, 'Duty 140')).not.toBeNull();
    expect(findDutyCard(availableDutiesList, 'Duty 140')).toBeNull();
  });

  it('shows warning messages for duties with conflicts', () => {
    render(<DutyManagerContainer />);

    const availableDutiesList = screen.getByText('Available duties').closest('div');
    const assignableDuty = within(availableDutiesList).getAllByRole('button')[0]; // Get the first duty
    fireEvent.click(assignableDuty);

    // Check that there are multiple warning messages for "You have duty at this time"
    const conflictWarnings = within(availableDutiesList).queryAllByText('You have duty at this time');
    expect(conflictWarnings.length).toBeGreaterThan(0); // Ensure that at least one conflict warning is present

    // Check that there are warning messages for "Less than 8hrs since last duty"
    const restWarnings = within(availableDutiesList).queryAllByText('Less than 8hrs since last duty');
    expect(restWarnings.length).toBeGreaterThan(0); // Ensure that at least one rest period warning is present
  });

  it('prevents assigning overlapping duties', () => {
    render(<DutyManagerContainer />);

    const availableDutiesList = screen.getByText('Available duties').closest('div');
    const duty140 = findDutyCard(availableDutiesList, 'Duty 140');
    fireEvent.click(duty140);

    const duty151 = findDutyCard(availableDutiesList, 'Duty 151');
    expect(duty151).toBeDisabled();

    const assignedDutiesList = screen.getByText("Duties you've signed up for").closest('div');
    expect(findDutyCard(assignedDutiesList, 'Duty 140')).toBeInTheDocument();
    expect(findDutyCard(assignedDutiesList, 'Duty 151')).not.toBeInTheDocument();
  });

  it('updates warning messages after assigning a duty', () => {
    render(<DutyManagerContainer />);

    const availableDutiesList = screen.getByText('Available duties').closest('div');
    const duty140 = findDutyCard(availableDutiesList, 'Duty 140');
    fireEvent.click(duty140);

    expect(within(availableDutiesList).getAllByText('Less than 8hrs since last duty').length).toBeGreaterThan(0);
  });

  it('allows unassigning a duty', () => {
    render(<DutyManagerContainer />);

    const availableDutiesList = screen.getByText('Available duties').closest('div');
    const assignedDutiesList = screen.getByText("Duties you've signed up for").closest('div');

    // First, assign a duty
    const duty140 = findDutyCard(availableDutiesList, 'Duty 140');
    fireEvent.click(duty140);

    // Then, unassign it
    const assignedDuty140 = findDutyCard(assignedDutiesList, 'Duty 140');
    fireEvent.click(assignedDuty140);

    // Check that it's back in the available duties list
    expect(findDutyCard(availableDutiesList, 'Duty 140')).toBeInTheDocument();
    expect(findDutyCard(assignedDutiesList, 'Duty 140')).not.toBeInTheDocument();
  });
});