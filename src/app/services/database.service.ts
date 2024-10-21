import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = '/32597517/Guangxing/api/v1';
const httpOptions = { headers: { 'Content-Type': 'application/json' } };

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  createDriver(driver: any) {
    const url = `${API_URL}/drivers/add`;
    return this.http.post(url, driver, httpOptions);
  }

  getAllDrivers() {
    const url = `${API_URL}/drivers`;
    return this.http.get(url);
  }

  deleteDriverById(driverId: string) {
    const url = `${API_URL}/drivers/delete?id=${driverId}`;
    return this.http.delete(url, httpOptions);
  }

  updateDriverById(driver: any) {
    const url = `${API_URL}/drivers/update`;

    const body = {
      id: driver._id,
      driver_license: driver.driver_license,
      driver_department: driver.driver_department,
    };

    return this.http.put(url, body, httpOptions);
  }

  createPackage(newPack: any) {
    const url = `${API_URL}/packages/add`;
    return this.http.post(url, newPack, httpOptions);
  }

  getAllPackages() {
    const url = `${API_URL}/packages`;
    return this.http.get(url);
  }

  deletePackageById(packageId: string) {
    const url = `${API_URL}/packages/delete?id=${packageId}`;
    return this.http.delete(url, httpOptions);
  }

  updatePackageById(newLocation: any) {
    const url = `${API_URL}/packages/update`;

    const body = {
      package_id: newLocation._id,
      package_destination: newLocation.package_destination
    };

    return this.http.put(url, body, httpOptions);
  }

  getStatistics() {
    const url = `${API_URL}/statistics`;
    return this.http.get(url);
  }
}
