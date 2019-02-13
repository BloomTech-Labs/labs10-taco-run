//
//  Event.swift
//  Taco Run
//
//  Created by Nikita Thomas on 2/11/19.
//  Copyright © 2019 Nikita Thomas. All rights reserved.
//

import Foundation

class Event: Codable {
    
    var name: String
    var id: String
    var date: Date
    var ownerID: String
    var locationID: String
    
    var participants: [String] //User ID
    
    var imageURL: String
    
    
    enum CodingKeys: String, CodingKey {
        case name
        case id
        case date
        case ownerID
        case locationID
        case participants
        case imageURL
    }

    
}
