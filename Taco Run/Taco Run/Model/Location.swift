//
//  Location.swift
//  Taco Run
//
//  Created by Nikita Thomas on 2/11/19.
//  Copyright © 2019 Nikita Thomas. All rights reserved.
//

import Foundation

class Location: Codable {
    
    var name: String
    var id: String
    

    enum CodingKeys: String, CodingKey {
        case name
        case id
    }
    
}
