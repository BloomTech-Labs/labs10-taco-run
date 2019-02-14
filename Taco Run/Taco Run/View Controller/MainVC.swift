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
    @IBOutlet weak var plusButton: UIButton!
    
    var user: User!
    

    override func viewDidLoad() {
        super.viewDidLoad()

        setupGestureRecognizers()
    }
    
    @IBAction func plusButtonTapped(_ sender: Any) {
        newEventTapped()
    }
    
    func setupGestureRecognizers() {
        
        let newEventGesture = UITapGestureRecognizer(target: self, action: #selector(newEventTapped))
        
        createEventView.addGestureRecognizer(newEventGesture)
        
        plusButton.imageView?.contentMode = UIView.ContentMode.scaleAspectFit
    }
    
    @objc func newEventTapped() {
        
        performSegue(withIdentifier: "toNewEvent", sender: nil)
        
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
