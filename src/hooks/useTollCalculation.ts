import { useMemo } from 'react';
import { INTER_CHANGES } from '../utils/constants';

export const useTollCalculation = () => {
  const calculateTollAmount = (
    activeTrip: any,
    exitInterchange: string
  ): number => {
    const baseRate = 20;
    const ratePerKm = 0.2;
    const weekendMultiplier = 1.5;
    const nationalHolidays = [
      { day: 23, month: 3 },
      { day: 14, month: 8 },
      { day: 25, month: 12 }
    ];

    const distanceMap: Record<string, number> = {
      [INTER_CHANGES.ZERO_POINT]: 0,
      [INTER_CHANGES.NS_INTERCHANGE]: 5,
      [INTER_CHANGES.PH4_INTERCHANGE]: 10,
      [INTER_CHANGES.FEROZPUR_INTERCHANGE]: 17,
      [INTER_CHANGES.LAKE_CITY_INTERCHANGE]: 24,
      [INTER_CHANGES.RAIWIND_INTERCHANGE]: 29,
      [INTER_CHANGES.BAHRIA_INTERCHANGE]: 34,
    };

    const distanceTravelled = Math.abs(
      distanceMap[exitInterchange] -
        distanceMap[activeTrip.EntryInterchange]
    );

    const exitDate = new Date();
    const exitDay = exitDate.getDay();
    const isWeekend = exitDay === 0 || exitDay === 6;

    const distanceRate = isWeekend ? weekendMultiplier * ratePerKm : ratePerKm;
    const distanceCost = distanceTravelled * distanceRate;

    const isNationalHoliday = nationalHolidays.some(
      (holiday) =>
        holiday.day === exitDate.getDate() &&
        holiday.month === exitDate.getMonth() + 1
    );

    const entryDate = new Date(activeTrip.EntryDateTime);
    const entryDay = entryDate.getDay();
    const numberPlateDigits = parseInt(
      activeTrip.NumberPlate.split('-')[1],
      10
    );
    const isEven = numberPlateDigits % 2 === 0;

    let discount = 0;

    if (isNationalHoliday) {
      discount = 0.5;
    } else if ((entryDay === 1 || entryDay === 3) && isEven) {
      discount = 0.1;
    } else if ((entryDay === 2 || entryDay === 4) && !isEven) {
      discount = 0.1;
    }

    const totalCost = (baseRate + distanceCost) * (1 - discount);

    return totalCost;
  };

  return useMemo(() => ({ calculateTollAmount }), []);
};
