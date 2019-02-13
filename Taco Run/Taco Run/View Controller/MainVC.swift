//
//  MainVC.swift
//  Taco Run
//
//  Created by Nikita Thomas on 2/12/19.
//  Copyright © 2019 Nikita Thomas. All rights reserved.
//

import UIKit

class MainVC: UIViewController {

    @IBOutlet weak var createEventView: UIView!
    
    var user: User!
    

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    
    func setupGestureRecognizers() {
        
        let newEventGesture = UITapGestureRecognizer(target: self, action: #selector(newEventTapped))
        
        createEventView.addGestureRecognizer(newEventGesture)
    }
    
    @objc func newEventTapped() {
        
        
        
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
