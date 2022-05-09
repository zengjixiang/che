/*********************************************************************
 * Copyright (c) 2020 Red Hat, Inc.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 **********************************************************************/
import { DriverHelper } from '../../utils/DriverHelper';
import axios from 'axios';
import { e2eContainer } from '../../inversify.config';
import { CLASSES } from '../../inversify.types';
import { IWebDriverCookie, IWebDriverOptionsCookie } from 'selenium-webdriver';
import { TestConstants } from '../../TestConstants';

const driverHelper: DriverHelper = e2eContainer.get(CLASSES.DriverHelper);
suite(`API request test `, async () => {
    test('Obtain token from Cookie', async () => {
       //The _oauth_proxy tokene is saved in the Cookies. Obtain token here:
       let  token = await driverHelper.getDriver().manage().getCookie('_oauth_proxy')
       console.log('<<<<<<_oauth_proxy value <<<<<<<' + token.value)

       //For instance we want to get all a workspace objects we can use dashboard API (API from SWAGGER works incorrect):
       let dashboardApiPref = '/dashboard/api/namespace/{YOUR_NAMESPACE}/devworkspaces'  
       
       //Perform request with authorized Cookies
       const res = await axios.get(TestConstants.TS_SELENIUM_BASE_URL+dashboardApiPref, {headers:{Cookie:'_oauth_proxy='+token.value}})
        
       //Print some data of the workspace
       console.log(res.data.items)
    });

  
});
