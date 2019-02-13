//
//  DateController.swift
//  Taco Run
//
//  Created by Nikita Thomas on 2/11/19.
//  Copyright © 2019 Nikita Thomas. All rights reserved.
//

import Foundation

class DateController {
    
    static let shared = DateController()
    
    func stringToDate(string: String) -> Date {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "E, d MMM yyyy HH:mm:ss Z"
        
        return dateFormatter.date(from: string)!
    }
    
    func dateToString(date: Date) -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "E, d MMM yyyy HH:mm:ss Z"
        return dateFormatter.string(from: date)
    }
    
}
