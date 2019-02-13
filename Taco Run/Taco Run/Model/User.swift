//
//  User.swift
//  Taco Run
//
//  Created by Nikita Thomas on 2/11/19.
//  Copyright © 2019 Nikita Thomas. All rights reserved.
//

import Foundation

class User: Codable {
    
    var name: String
    var id: String
    var location: String
    var email: String
    var favorites: [String] // Strings of GMP id
    
    var events: [String] // Event ID
    
    var friends: [String] // User ID
    
    enum CodingKeys: String, CodingKey {
        case name
        case id
        case location
        case email
        case favorites
        case friends
        case events
    }
    
}
