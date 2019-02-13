//
//  EventCell.swift
//  Taco Run
//
//  Created by Nikita Thomas on 2/11/19.
//  Copyright © 2019 Nikita Thomas. All rights reserved.
//

import UIKit
import Kingfisher

class EventCell: UITableViewCell {
    
    @IBOutlet weak var eventImage: UIImageView!
    @IBOutlet weak var date: UILabel!
    @IBOutlet weak var attendingList: UILabel!
    @IBOutlet weak var eventLocation: UILabel!
    @IBOutlet weak var attendeeCount: UILabel!
    
    @IBOutlet weak var goingButton: UIButton!
    @IBOutlet weak var notGoingButton: UIButton!
    @IBOutlet weak var shareButton: UIButton!
    
    
    var event: Event!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        
        self.date.text = DateController.shared.dateToString(date: event.date)
//        self.attendingList.text =
//        self.eventLocation.text =
        let imageURL = URL(string: event.imageURL)!
        self.eventImage.kf.setImage(with: imageURL)
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        
        // Configure the view for the selected state
    }
    
    
    @IBAction func goingButtonTapped(_ sender: Any) {
        
        
    }
    
    
    @IBAction func notGoingTapped(_ sender: Any) {
        
        
    }
    
    
    @IBAction func shareTapped(_ sender: Any) {
        
        
    }
    
    
}
